import { cookies } from 'next/headers';
import AdminAssessments from '@/components/admin/assessments/assessments';
import { DataTable } from './data-table';
import { redirect } from 'next/navigation';
import ProfessorAdmin from '@/components/admin/professor/professor';


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
      `${process.env.NEXT_PUBLIC_DEPLOY_BASE_V2_URL}api/admin/professor`,
      {
        method: 'GET',
        headers: { authorization: token },
      }
    );

    if (!response.ok) {
      return [];
    }

    const { data } = await response.json();
    console.log('data', data)
    return data;
  } catch (error) {
    return [];
  }
}


export default async function Page({ searchParams }: any) {
  const competency = await fetchCompetency();
  return <ProfessorAdmin DataTable={DataTable} data={competency} searchParams={searchParams} />;
}