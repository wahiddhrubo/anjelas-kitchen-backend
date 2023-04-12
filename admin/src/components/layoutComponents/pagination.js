import ReactPaginate from "react-paginate";

export default function Pagination({ totalPages, setPage, currentPage }) {
	const onPageChange = (e) => {
		setPage(e.selected + 1);
	};

	console.log(currentPage);
	const styles = {
		wrapper: "w-fit flex flex-wrap content-center justify-center mx-auto",
		pageList:
			"w-10 h-10 my-auto cursor-pointer border-0 border-primary hover:border-2 rounded-full mx-2 grid place-items-center text-body-md ",
		breakLabel:
			"w-10 h-10 my-auto cursor-pointer  font-semibold grid place-items-center text-body-md  relative",
		pageListLink: "w-full h-full grid place-items-center",
		activePage: "  rounded-full text-primary border-2 ",
		prevNext: "p-4 w-fit hover:text-primary cursor-pointer font-bold ",
	};
	return (
		<ReactPaginate
			breakLabel="..."
			previousLabel="<<"
			nextLabel=">>"
			pageRangeDisplayed={3}
			marginPagesDisplayed={1}
			pageCount={totalPages}
			forcePage={currentPage - 1}
			disabledClassName="hidden"
			containerClassName={styles.wrapper}
			activeClassName={styles.activePage}
			pageClassName={styles.pageList}
			pageLinkClassName={styles.pageListLink}
			breakClassName={styles.breakLabel}
			nextClassName={styles.prevNext}
			previousClassName={styles.prevNext}
			onPageChange={onPageChange}
		/>
	);
}
