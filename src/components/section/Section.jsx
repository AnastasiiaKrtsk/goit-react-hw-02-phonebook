const Section = ({ tittle, children }) => {
  return (
    <section>
      <h2>{tittle}</h2>
      {children}
    </section>
  );
};
export default Section;
