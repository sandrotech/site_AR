import { BlogPostPage } from "@/components/pages/blog-post-page"

export default function BlogPost({ params }: { params: { slug: string } }) {
    return <BlogPostPage slug={params.slug} />
}
