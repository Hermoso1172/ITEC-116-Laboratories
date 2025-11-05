function MainContainer({ children }) {
  return (
    <div className="w-[1200px] mx-auto max-w-full flex flex-col">
      {children}
    </div>
  );
}

export default MainContainer;
