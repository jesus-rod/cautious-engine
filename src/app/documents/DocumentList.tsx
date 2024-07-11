'use client';

import { fetchDocumentList } from '@/app/functions';
import { PAGINATION_LIMIT } from '@/lib/constants';
import { useEffect, useState } from 'react';
import Pagination from '../../components/Pagination';
import { DocumentData, DocumentListResponse, PaginationData } from '../types';
import DocumentsTable from './DocumentsTable';

const DocumentsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<DocumentData[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const documentList: DocumentListResponse =
        await fetchDocumentList(currentPage);
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
      <DocumentsTable
        data={data}
        startIndex={PAGINATION_LIMIT * (currentPage - 1)}
      />
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
