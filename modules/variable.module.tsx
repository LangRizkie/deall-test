class Global {
    static paginationLimit = process.env.NEXT_PUBLIC_PAGINATION_LIMIT || '6'
    static paginationSkip = process.env.NEXT_PUBLIC_PAGINATION_SKIP || '0'
    static debounceTime = process.env.NEXT_PUBLIC_DEBOUNCE_TIME || 500
}

export default Global