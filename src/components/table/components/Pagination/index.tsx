import ReactPaginate from 'react-paginate';
import { ChevronRight, ChevronLeft } from 'lucide-react';

type Props = {
  totalPages: number;
  goToPage: (selectedItem: { selected: number }) => void;
  currentPage: number;
  hasTableInfo: boolean;
};

const pageItemClassName = [
  'flex items-center justify-center min-w-9 h-9',
  'cursor-pointer select-none text-secondary',
  'transition-colors duration-150',
  'hover:bg-brand-primary-light hover:text-primary',
].join(' ');

const Pagination = ({
  goToPage,
  totalPages,
  currentPage,
  hasTableInfo,
}: Props) => (
  <div className={`flex justify-center py-4 ${hasTableInfo ? '' : 'w-full'}`}>
    <ReactPaginate
      forcePage={currentPage - 1}
      nextLabel={<ChevronRight size={18} strokeWidth={1.75} color="currentColor" />}
      onPageChange={goToPage}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={totalPages}
      previousLabel={<ChevronLeft size={18} strokeWidth={1.75} color="currentColor" />}
      renderOnZeroPageCount={null}
      containerClassName="flex flex-wrap gap-0.5 p-0 items-center list-none"
      pageClassName={pageItemClassName}
      pageLinkClassName="text-btn font-semibold w-full h-full flex items-center justify-center"
      previousClassName={pageItemClassName}
      previousLinkClassName="w-full h-full flex items-center justify-center"
      nextClassName={pageItemClassName}
      nextLinkClassName="w-full h-full flex items-center justify-center"
      breakClassName={`${pageItemClassName} pointer-events-none`}
      breakLinkClassName="text-btn font-semibold w-full h-full flex items-center justify-center text-secondary"
      activeClassName="!bg-[var(--brand-primary)] !text-white hover:!bg-[var(--brand-primary)] hover:!text-white"
      activeLinkClassName="text-button"
      disabledClassName="!pointer-events-none !opacity-40"
      breakLabel="…"
    />
  </div>
);

export default Pagination;