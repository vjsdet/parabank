import { XMLParser } from 'fast-xml-parser';

export function xmlToJson(xmlString:string) {
  const parser = new XMLParser();
  const jsonResult = parser.parse(xmlString);
  return jsonResult;
}