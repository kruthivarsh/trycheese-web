// Data accessors for pages and route handlers. Deliberately not wrapped in
// `use cache`: the blog is prerendered at build time, so caching adds nothing,
// and reading content/blog fresh on every build guarantees a new daily post
// reaches the pages, sitemap, llms.txt and the feed.
import {
  getPost,
  getPosts,
  neighbours,
  postsByTopic,
  relatedPosts,
  renderPost,
} from "@/lib/blog/posts";

export async function allPosts() {
  return getPosts();
}

export async function postWithContext(slug: string) {
  const post = getPost(slug);
  if (!post) return null;
  return {
    post,
    ...renderPost(post),
    related: relatedPosts(post),
    ...neighbours(post),
  };
}

export async function topicPosts(topic: string) {
  return postsByTopic(topic);
}
