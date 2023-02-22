import fs from 'node:fs/promises'
import matter from 'gray-matter'

const posts = await fs.readdir('../docs/blog')

const data = posts
  .filter((str) => str.endsWith('.md'))
  .map((post) => {
    const file = matter.read(`../docs/blog/${post}`)
    const data = file.data
    return {
      ...data,
      path: `/blog/${post.replace(/\.md$/, '')}`,
    }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))

await fs.writeFile(
  '../docs/blog/posts.json',
  JSON.stringify(data, null, 2),
  'utf-8'
)
