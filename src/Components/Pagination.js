import { useEffect } from "react";
import ReactPaginate from "react-paginate";

export default function Pagination({ page, pageCount, setPage }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <ReactPaginate
      previousLabel={"«"}
      nextLabel={"»"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={1}
      onPageChange={(page) => setPage(page.selected + 1)}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
}
