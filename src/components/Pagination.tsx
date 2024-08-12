import { useRouter } from 'next/router';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const router = useRouter();
  const currentPage = parseInt((router.query.page as string) || '1', 10);

  const handlePageChange = (newPage: number) => {
    const query = router.query.q
      ? { q: router.query.q, page: newPage }
      : { page: newPage };

    if (newPage > 0 && newPage <= totalPages) {
      router.replace({
        pathname: '/',
        query: query,
      });
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div data-testid="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      <span className="pages-span">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
