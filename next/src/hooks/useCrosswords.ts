import { useEffect, useState, useRef, useCallback } from "react";
import { CrosswordsData } from "../services/Games";
import { matrix, Size, Coordinates } from "../services/Utils";

export type TileParams = {
  content: string;
  blocked: boolean;
  start: Coordinates[];
};

export type CurrentData = {
  cursor: Coordinates;
  word: string;
  wordStart: Coordinates;
  horizontal: boolean;
  indice: number;
};

export type Cursor = Coordinates & { horizontal: boolean };

export type useCrosswordsReturn = {
  definitions: string[];
  size: Size;
  tiles: TileParams[][];
  getIndice: (x: number, y: number) => string | undefined;
  isHighlighted: (x: number, y: number) => boolean;
  setData: (data: CrosswordsData) => void;
  highlight: (at: Coordinates[]) => void;
  at: (x: number, y: number) => TileParams;
  fromUser: (x: number, y: number) => string | undefined;
  type: (x: number, y: number, data: string) => void;
};

export default function useCrosswords() {
  const [apiData, setApiData] =
    useState<CrosswordsData>(); /* Define type later */
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set());
  const [starts, setStarts] = useState<Map<string, string>>(new Map());
  const [definitions, setDefinitions] = useState<string[]>([]);
  const [size, setSize] = useState<Size>({ x: 14, y: 14 });
  const [tiles, setTiles] = useState<TileParams[][]>(
    matrix(size, { blocked: true })
  );
  const [userData, setUserData] = useState<Map<string, string>>(new Map());
  const [cursor, setCursor] = useState<Cursor>();
  const historic = useRef<Coordinates>();
  function _({ x, y }: Coordinates) {
    return `${y}:${x}`;
  }
  function highlight(at: Coordinates[]) {
    setHighlighted(new Set(at.map(_)));
  }
  function isHighlighted(x: number, y: number) {
    return highlighted.has(_({ x, y }));
  }

  function getIndice(x: number, y: number) {
    return starts.get(_({ x, y }));
  }

  function iterateOverWord(
    from: Cursor,
    length: number,
    callback: (x: number, y: number, i: number) => void
  ) {
    let { x, y } = from;
    const horizontal = from.horizontal;
    for (let i = 0; i < length; i++) {
      callback(x, y, i);
      if (horizontal) {
        x++;
      } else {
        y++;
      }
    }
  }
  function setData(data: CrosswordsData) {
    console.log("setData", data);
    const {
      content: { words, size: dsize },
    } = data;
    console.log("setData", words, dsize);

    const startsMap = new Map();
    const definitions = [];
    const dtiles = matrix(dsize, () => ({
      blocked: true,
      content: "",
      start: [],
    }));
    for (let i = 0; i < words.length; i++) {
      const { start, description, content, horizontal } = words[i];
      const s = _(start);
      definitions.push(description);
      const k = startsMap.get(s);
      startsMap.set(s, k ? `${k}-${i + 1}` : `${i + 1}`);
      iterateOverWord({ ...start, horizontal }, content.length, (x, y, i) => {
        dtiles[y][x].content = content[i];
        dtiles[y][x].blocked = false;
        dtiles[y][x].start.push(start);
      });
    }
    setSize(dsize);
    setApiData(data);
    highlight([]);
    setUserData(new Map());
    setStarts(startsMap);
    setTiles(dtiles);
    setDefinitions(definitions);
  }
  function at(x: number, y: number) {
    return tiles![y]?.[x];
  }
  function isCurrent(x: number, y: number) {
    return cursor?.x === x && cursor?.y === y;
  }

  function fromUser(x: number, y: number) {
    return userData.get(`${y}:${x}`);
  }
  function getStartFrom(c: Cursor, word?: TileParams): Coordinates | undefined {
    const { x, y, horizontal } = c;
    const k = horizontal ? "x" : "y";
    const l = horizontal ? "y" : "x";
    return word?.start.find((s) => {
      if (s[l] !== c[l]) return false; /* Not same orientation*/
      if (s[k] < c[k]) return true; /* Start is before */
      const next = at(x + (horizontal ? 1 : 0), y + (horizontal ? 0 : 1));
      if (!next || next.blocked) return false;
      const _start = getStartFrom(
        {
          x: x + (horizontal ? 1 : 0),
          y: y + (horizontal ? 0 : 1),
          horizontal,
        },
        next
      );
      if (!_start) return false;
      if (!at(_start.x, _start.y).start.find((z) => z[k] === s[k]))
        return false;
      return true;
    });
  }
  function canWrite({ x, y, horizontal }: Cursor) {
    const k = at(x, y);
    if (!k || k.blocked) return false;
    return getStartFrom({ x, y, horizontal }, k) !== undefined;
  }
  function type(data: string) {
    if (!cursor) return;
    if (!canWrite(cursor)) return;
    setUserData(userData.set(_(cursor), data));
    setCursor((k) => {
      if (!k) return;
      if (k.horizontal) {
        return { ...k, x: Math.min(size.x, k.x + 1) };
      }
      return { ...k, y: Math.min(size.y, k.y + 1) };
    });
  }
  function erase() {
    if (!cursor) return;
    const h = cursor.horizontal ? "x" : "y";
    setUserData((m) => {
      const j = new Map(m);
      j.delete(_({ ...cursor, [h]: Math.max(0, cursor[h] - 1) }));
      return j;
    });
    setCursor((k) => {
      if (!k) return k;
      const _start = getStartFrom(k, at(k.x, k.y));
      if (_start && _start.x === k.x && _start.y === k.y) return k;
      return { ...k, [h]: Math.max(0, k[h] - 1) };
    });
  }
  function click(x: number, y: number) {
    setCursor((k) => {
      if (isHighlighted(x, y)) {
        const n = { x, y, horizontal: !k!.horizontal };
        if (canWrite(n)) return { ...n, ...getStartFrom(n, at(x, y))! };
      }
      const d = starts.get(_({ x, y }));
      if (d && !d.includes("-")) {
        /* click on a unique start */
        const w = apiData!.content.words[parseInt(d) - 1];
        return { x, y, horizontal: w.horizontal };
      }

      const m = { x, y, horizontal: true };
      const a = at(x, y);
      if (canWrite(m)) return { ...getStartFrom(m, a)!, horizontal: true };
      const o = { ...m, horizontal: false };
      if (canWrite(o)) return { ...getStartFrom(o, a)!, horizontal: false };
      return k;
    });
  }
  function jump(indice: number) {
    if (indice <= 0) return;
    if (indice > definitions.length) {
      /**
       * NOT IMPLEMENTED
       * Find the previous word that has not been filled
       */
      return;
    }
    const word = apiData!.content.words[indice - 1];
    setCursor({
      ...word.start,
      horizontal: word.horizontal,
    });
  }

  const [current, setCurrent] = useState<CurrentData>();
  useEffect(() => {
    if (!cursor || !apiData) return;
    if (!canWrite(cursor)) return;
    const start = at(cursor.x, cursor.y)!;
    let wordStart = getStartFrom(cursor, start)!;
    const wordIndex = starts.get(_(wordStart));
    if (!wordIndex) throw new Error("No word index");
    const indice = wordIndex.split("-");
    const index = apiData.content.words.findIndex(
      (w, i) =>
        indice.includes((i + 1).toString()) &&
        w.horizontal === cursor.horizontal
    );
    if (index === -1) return;
    const word = apiData.content.words[index];
    const h: Coordinates[] = [];
    iterateOverWord(
      { ...wordStart, horizontal: cursor.horizontal },
      word.content.length,
      (x, y) => {
        h.push({ x, y });
      }
    );
    if (h.length !== word.content.length) {
      throw new Error("Wrong word length");
    }
    highlight(h);
    setCurrent({
      cursor: cursor,
      word: word.content,
      wordStart: wordStart,
      horizontal: cursor.horizontal,
      indice: index + 1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor]);

  useEffect(() => {
    return () => {
      historic.current = cursor;
    };
  }, [cursor]);

  return {
    definitions,
    size,
    tiles,
    getIndice,
    isHighlighted,
    setData,
    userData,
    highlight,
    at,
    fromUser,
    type,
    click,
    current,
    erase,
    isCurrent,
    jump,
  };
}
