export const LESSON_LIST_GROQ = `*[_type == "lesson"] | order(publishedAt desc){
  _id, title, slug, summary, publishedAt, "cover": cover.asset->url
}`;
