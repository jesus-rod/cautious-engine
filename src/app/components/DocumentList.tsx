'use client';

import {fetchDocumentList} from '@/app/functions';
import {PAGINATION_LIMIT} from '@/lib/constants';
import {useEffect, useState} from 'react';
import {DocumentData, DocumentListResponse, PaginationData} from '../types';
import DocumentsTable from './DocumentsTable';

const DocumentsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<DocumentData[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const documentList: DocumentListResponse = await fetchDocumentList(currentPage);
      setData(documentList.data);
      setPagination(documentList.pagination);
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };


  return (
    <div>
      <DocumentsTable data={data} startIndex={(PAGINATION_LIMIT * (currentPage - 1))} />
      {pagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default DocumentsList;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange}) => {
  return (
    <div className="flex justify-center my-4">
      {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-800 dark:text-gray-200'
            }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};
