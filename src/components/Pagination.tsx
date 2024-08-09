'use client';
import { useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get('page');
  const q = searchParams.get('q');

  const currentPage = parseInt((page as string) || '1', 10);

  const handlePageChange = (newPage: number) => {
    const query = q ? `?q=${q}&page=${newPage}` : `?page=${newPage}`;

    if (newPage > 0 && newPage <= totalPages) {
      router.push(`${query}`);
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
