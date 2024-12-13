//Discussion.MD
# First Impressions
To being, working FE to BE. Easier to spot some FE problems although I see some BE stuff to do as well, mainly:

Full stack: 
- [x] Make application work

FE: 
- [x] Separating components
- [x] Making components server side and dumb
- [x] Making components look better
- [x] Making components show loading
- [x] Show errors
- [x] Use react state with functinal components
- [x] Fix typing errors

BE: 
- [x] Check typing
- [x] Check queries
- [ ] Add Indices
- [x] Fix typing errors

# Afterwards
- Refactored the frontend to have single responsibility components
- All components rendered server side except `<AdvocatesTable />`
- Backend now performs filtering rather than filtering by array on FE
- Filtering performed by DB takes load off server and client
- Improves error handling overall
- SearchBar and Table components reusable
- Improves legibility of table
- One big PR vs smaller PRs

# TODO
- Add indices to schema to allow for fast DB queries
- Add filtering on non text fields (jsonb, bigit, int), evolve the search query
- Add pagination (add an offset and limit to query), change items per row, column sorting
- Implement an onclick for when a user clicks a row?
- Finish adding loading indicator/skeleton
- Add tests
- Make minor UI adjustments to it looks better
- Put NextJS app in its own container to better simulate dev environment
- Change route to match api better for platform uniformity
