// noinspection SuspiciousTypeOfGuard

/**
 * 通过limit和page值构建分页的$limit和$skip数据对象
 * @param $limit must be an number or throw error
 * @param page must be an number or throw error
 * @returns {{$skip: number, $limit: number}}
 */
export default function pagination($limit: number, page: number) {
  if (typeof $limit === 'number' && typeof page === 'number') {
    return {
      $limit,
      $skip: (page - 1) * $limit,
    };
  }
  throw new Error('$limit or page is not an number');
}
