import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://www.shivanshsharma.site',
      lastModified: new Date(),
    },
  ]
}