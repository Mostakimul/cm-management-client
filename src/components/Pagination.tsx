interface PaginationProps {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  onPageChange: (page: number) => void;
}

const Pagination = ({ meta, onPageChange }: PaginationProps) => {
  const { page, limit, total } = meta;
  const totalPages = Math.ceil(total / limit);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="join">
      {pages.map((curPage) => (
        <input
          key={curPage}
          className={`join-item btn btn-sm ${
            page === curPage ? 'btn-active' : ''
          }`}
          type="radio"
          name="options"
          aria-label={`Page ${curPage}`}
          checked={page === curPage}
          onChange={() => onPageChange(curPage)}
        />
      ))}
    </div>
  );
};

export default Pagination;
