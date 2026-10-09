import BlogEditor from '@/components/blogs/BlogEditor';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <BlogEditor id={id} />;
}
