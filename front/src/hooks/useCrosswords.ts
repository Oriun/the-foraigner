import { useState } from "react";
import { matrix, Size, Coordinates } from "../services/Utils";

export type CrosswordsData = {};

export type TileParams = {
  indice: string;
  content: string;
  blocked: boolean;
};

export type useCrosswordsReturn = {
        definitions: string[];
        size: Size;
        tiles: TileParams[][];
        getIndice: (x: number, y: number)=> string | undefined;
        isHighlighted: (x: number, y: number)=> boolean;
        setData: (data: CrosswordsData)=> void;
        highlight: (at: Coordinates[]) => void;
        at: (x: number, y: number)=> TileParams;
        fromUser: (x: number, y: number)=> string | undefined;
        type: (x: number, y: number, data: string)=> void;
    }


export default function useCrosswords() {
  const [apiData, setApiData] =
    useState<CrosswordsData>(); /* Define type later */
  const [highlighted, setHighlighted] = useState<Set<string>>(new Set());
  const [starts, setStarts] = useState<Map<string, string>>(new Map());
  const [definitions, setDefinitions] = useState<string[]>([]);
  const [size, setSize] = useState<Size>({ x: 14, y: 14 });
  const [tiles, setTiles] = useState<TileParams[][]>(matrix(size, { blocked: true}));
  const [userData, setUserData] = useState<Map<string, string>>(new Map());

  function highlight(at: Coordinates[]) {
    setHighlighted(new Set(at.map(({ x, y }) => `${y}-${x}`)));
  }
  function isHighlighted(x: number, y: number) {
    return highlighted.has(`${y}:${x}`);
  }

  function getIndice(x: number, y: number) {
    return starts.get(`${y}:${x}`);
  }

  function setData(data: CrosswordsData){
    setApiData(data)
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
    type,
  };
}
