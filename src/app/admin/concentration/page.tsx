import { DataTable } from './data-table';
import { cookies } from 'next/headers';
import AdminConcentration from '@/components/admin/concentration/concentration';
import { redirect } from 'next/navigation';

async function fetchCompetency() {
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
      `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/concentration`,
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
  const competency = await fetchCompetency();


  return <AdminConcentration DataTable={DataTable} data={competency} />;
}