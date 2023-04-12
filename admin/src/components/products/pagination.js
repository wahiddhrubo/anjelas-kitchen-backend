import ReactPaginate from "react-paginate";

export default function Pagination(argument) {
	return (
		<ReactPaginate
			breakLabel="..."
			previousLabel="<<"
			nextLabel=">>"
			pageRangeDisplayed={3}
			marginPagesDisplayed={1}
			pageCount={totalPages}
			activeClassName={styles.activePage}
			pageClassName={styles.page}
			nextLinkClassName={styles.prevNext}
			previousLinkClassName={styles.prevNext}
			renderOnZeroPageCount={null}
			onPageChange={handlePageClick}
		/>
	);
}
