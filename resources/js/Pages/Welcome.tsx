import { Head, useForm, router } from '@inertiajs/react';
export default function Welcome({ todos, search }) {
    const { data, setData, post, reset } = useForm({
        title: '',
        description: '',
    });
    function handleSubmit(e) {
        e.preventDefault();
        post('/todos', {
            onSuccess: () => reset(),
        });
    }
    function handleDelete(id) {
        if (confirm('Are you sure you want to delete this todo?')) {
            router.delete(`/todos/${id}`);
        }
    }
    function handleSearch(e) {
        router.get('/', { search: e.target.value }, { preserveState: true });
    }
  return (
    <>
      <Head title="To-Do List" />
    <div className="flex min-h-screen">
    <div className="bg-purple-200 p-3">
    <button
    onClick={() => {
        if (confirm('Kosongkan To-Do List?')) {
        router.delete('/todos');
        }
    }}
    className="mb-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
    >
    Clear
    </button>
    </div>
        <div className="w-1/4 bg-purple-50 flex-1 max-h-[700px] p-6 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">List To-Do</h2>
        <ul className="flex flex-col items-start gap-4 pr-2">
            {todos.map((todo) => (
                <li key={todo.id} className="w-full border-b pb-2">
                    <strong>{todo.title}</strong>
                    <p className="text-sm text-gray-400">{todo.description}</p>
                    <button
                        onClick={() => handleDelete(todo.id)}
                        className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </li>
            ))}
        </ul> 

        </div>
    <div className="flex-1 flex flex-col items-center justify-center p-10">
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center">To-Do List</h1>
              <input
                type="text"
                placeholder="Nama To-Do..."
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
                className="border p-2 w-full rounded"
            />
            <textarea
            placeholder="Deskripsi To-Do..."
            value={data.description}
            onChange={(e) => setData('description', e.target.value)}
            className="border p-2 w-full rounded h-32 max-h-40 overflow-y-auto resize-none"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full">
            Add
        </button>
        </form>
    </div>
        <div className="w-1/4 bg-purple-50 border-r p-6 overflow-y-auto">
        <form onSubmit={handleSearch} className="mb-4">
            <input
            type="text"
            name="search"
            placeholder="Cari To-Do"
            defaultValue={search}
            className="border p-2 w-full rounded"
        />
        <button className="mt-2 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 w-full">
            Search
        </button>
    </form>
    </div>
    </div>
    </>
  );
}
