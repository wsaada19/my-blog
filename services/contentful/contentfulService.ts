import axios from 'axios';
import { ContentfulEntryType } from './contentfulEntries';

const baseUrl = process.env.CONTENTFUL_URL;
const token = process.env.CONTENTFUL_API_KEY;

// TODO: Add proper error handling
export const getEntriesOfType = async (contentType: ContentfulEntryType) => {
  const endpoint = `${baseUrl}/entries?access_token=${token}&content_type=${contentType}`;
  const result = await axios.get(endpoint);
  return result.data;
};

export const getAssetById = async (assetId: ContentfulEntryType) => {
  const endpoint = `${baseUrl}/assets/${assetId}?access_token=${token}`;
  const result = await axios.get(endpoint);
  return result.data;
};