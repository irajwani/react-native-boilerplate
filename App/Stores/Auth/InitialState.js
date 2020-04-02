export const INITIAL_STATE = {
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
