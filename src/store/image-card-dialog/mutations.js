/*
export function someMutation (state) {
}
*/

export function toggleDialogOpen (state) {
  state.dialogOpen = !state.dialogOpen
}

export function setDialogOpen (state, value) {
  state.dialogOpen = value
}

export function setPicture (state, picture) {
  state.picture = picture
}
