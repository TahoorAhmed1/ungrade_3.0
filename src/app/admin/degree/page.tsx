import { DataTable } from './data-table';
import { cookies } from 'next/headers';
import AdminDegree from '@/components/admin/degree/degree';
import { redirect } from 'next/navigation';

async function fetchCourse() {
  const token = cookies().get('ungradeToken')?.value;
  const user_data: any = cookies().get('ungradeUser')?.value;

  if (!token) {
    return redirect('/login');
  }

  let user;
  try {
    user = user_data && JSON.parse(user_data);
  } catch (error) {
    return redirect('/login');
  }

  if (user?.type !== 'admin') {
    return redirect('/login');
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/degree`,
      {
        method: 'GET',
        headers: { authorization: token },
      }
    );

    if (!response.ok) {
      return [];
    }

    const { data = [] } = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}

export default async function Page() {
  const courses = await fetchCourse();

  return <AdminDegree DataTable={DataTable} data={courses} />;
}