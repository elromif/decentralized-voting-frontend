import { lusitana } from '@/app/ui/fonts';
import Candidate from '../ui/candidate';

export default function Vote() {
  const candidates = [{name: 'Jim', id: 0}, {name: 'John', id: 1}, {name: 'Jack', id: 2}];

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className=" h-20 shrink-0 rounded-lg bg-blue-500 p-4 md:h-52">
      </div>
      <div className="mt-4 flex grow gap-4">
        <div className="flex flex-col justify-top items-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:px-20 grow">
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Candidate's List</strong> 
          </p>
          <div className="flex flex-row gap-8">
            {candidates.map((candidate) => {
              return <Candidate key={candidate.id} name={candidate.name} />
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
