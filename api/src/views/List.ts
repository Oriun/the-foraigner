/** @format */

import { Response } from 'express';
import { Document } from 'mongoose';

export default function <T = any>(
  response: Response,
  elements: T[],
  page: number,
  perPage: number,
  totalElements: number
): Response {
  return response.status(200).json({
    meta: {
      count: elements.length,
      totalElements,
      page,
      maxPage: Math.floor(totalElements / perPage)
    },
    data: elements
  });
}
