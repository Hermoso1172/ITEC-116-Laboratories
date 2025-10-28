function Book({ book }) {
  return (
    <div key={book.id} className="flex w-45 flex-col bg-white cursor-pointer">
      <img
        src={book.cover}
        alt={book.title}
        className="rounded-md mb-3 h-70 object-cover"
      />
      <h2 className="font-bold text-base">{book.title}</h2>
      <p className="text-sm text-gray-600">{book.author}</p>
    </div>
  );
}

export default Book;
