export const INITIAL_STATE = {
    isLoading: false,
    newUser: {},
    data: {}, //for edit profile
    registerStatus: false,
    errorMessage: null,

    uid: '',
    profile: {
        cards: [],
        customerId: "",
        profile: {
            photoURL: "",
            displayName: ""
        },
        isFetching: true,
    },
    
     
}
