export default {
    setup(){
        const changeView = (viewName:string) => {
            $emit('onChangeView', viewName);
        };
        return {
            changeView,
        };
    }
}