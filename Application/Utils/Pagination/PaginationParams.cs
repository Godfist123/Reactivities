using System;

namespace Application.Utils.Pagination;

public class PaginationParams<TCursor>
{
    private const int MaxPageSize = 50;
    public TCursor? Cursor { get; init; }
    private int _pageSize = 3;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = value > MaxPageSize ? MaxPageSize : value;
    }
}
