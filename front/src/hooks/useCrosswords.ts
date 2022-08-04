import { useState } from "react";
import { CrosswordsData } from "../services/Games";
import { matrix, Size, Coordinates } from "../services/Utils";

export type TileParams = {
  content: string;
  blocked: boolean;
  start: Coordinates[];
};

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

  function _({ x, y }: Coordinates) {
    return `${y}-${x}`;
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

  function setData(data: CrosswordsData) {
    const {
      content: { words, size: dsize }
    } = data;
    const startsMap = new Map();
    const definitions = [];
    const dtiles = matrix(dsize, ()=>({ blocked: true, content:"", start:[] }));
    for (let i = 0; i < words.length; i++) {
      const { start, description, content, horizontal } = words[i];
      const s = _(start);
      definitions.push(description);
      const k = startsMap.get(s);
      startsMap.set(s, k ? `${k}-${i+1}` : i+1);
      for (let j = 0; j < content.length; j++) {
        const x = horizontal ? start.x + j : start.x;
        const y = horizontal ? start.y : start.y + j;
        dtiles[y][x].content = content[j];
        dtiles[y][x].blocked = false;
        dtiles[y][x].start.push(start);
      }
    }
    setSize(dsize);
    setApiData(data);
    highlight([]);
    setUserData(new Map());
    setStarts(startsMap);
    setTiles(dtiles)
    setDefinitions(definitions);
  }
  function at(x: number, y: number) {
    return tiles![y][x];
  }

  function fromUser(x: number, y: number) {
    return userData.get(`${y}:${x}`);
  }
  function type(x: number, y: number, data: string) {
    setUserData(userData.set(`${y}:${x}`, data));
  }

  return {
    definitions,
    size,
    tiles,
    getIndice,
    isHighlighted,
    setData,
    highlight,
    at,
    fromUser,
    type
  };
}
