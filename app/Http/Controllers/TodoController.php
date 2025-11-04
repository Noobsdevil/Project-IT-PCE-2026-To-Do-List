<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index(Request $request)
    {
        $query = \App\Models\Todo::query();
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }
        $todos = $query->latest()->get();
        return inertia('Welcome', [
            'todos' => $todos,
            'search' => $request->search,
        ]);
    }
    public function DestroyAll()
    {
        \App\Models\Todo::truncate();
        return redirect()->back();
    }
    public function showAll()
    {
        $todos = Todo::oldest()->get();
        return Inertia::render('TodoList', [
            'todos' => $todos,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        Todo::create($request->only('title', 'description'));
        return redirect('/');
    }
    public function destroy($id)
    {
        $todo = Todo::findOrFail($id);
        $todo->delete();
        return redirect()->back();
    }
}
