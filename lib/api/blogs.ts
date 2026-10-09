import api from '@/lib/api';
import { BLOGS_API_URL, type Blog, type BlogInput, type BlogList } from '@/lib/blogs';

export async function fetchAdminBlogs(params: { page: number; search: string; status: string }, signal?: AbortSignal) {
  const response = await api.get<{ data: BlogList }>(BLOGS_API_URL + '/admin', { params: { ...params, limit: 10 }, signal });
  return response.data.data;
}
export async function fetchAdminBlog(id: string, signal?: AbortSignal) {
  const response = await api.get<{ data: Blog }>(BLOGS_API_URL + '/admin/' + encodeURIComponent(id), { signal });
  return response.data.data;
}
export async function saveBlog(input: BlogInput, id?: string) {
  const response = id
    ? await api.put<{ data: Blog }>(BLOGS_API_URL + '/' + encodeURIComponent(id), input)
    : await api.post<{ data: Blog }>(BLOGS_API_URL, input);
  return response.data.data;
}
export async function deleteBlog(id: string) {
  await api.delete(BLOGS_API_URL + '/' + encodeURIComponent(id));
}
export async function uploadBlogImage(file: File) {
  const form = new FormData();
  form.append('image', file);
  const response = await api.post<{ data: { url: string } }>(BLOGS_API_URL + '/upload', form);
  return response.data.data.url;
}
