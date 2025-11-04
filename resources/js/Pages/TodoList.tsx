import { Head } from '@inertiajs/react';

export default function TodoList({ todos }) {
  return (
    <>
      <Head title="All Todos" />
      <div className="p-10 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">All To-Dos</h1>
        <ul className="flex flex-col gap-4">
          {todos.map((todo) => (
            <li key={todo.id} className="border-b pb-2">
              <strong>{todo.title}</strong>
              <p className="text-sm text-gray-500">{todo.description}</p>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <a
            href="/"
            className="text-blue-600 hover:underline"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </>
  );
}
