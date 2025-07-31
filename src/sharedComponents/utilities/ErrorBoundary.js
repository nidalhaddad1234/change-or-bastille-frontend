import React from "react";
const PageHasBeenForceRefreshed = "page-has-been-force-refreshed";

const retryPageLoading = () => {
  const pageHasAlreadyBeenForceRefreshed = JSON.parse(
    window.localStorage.getItem(PageHasBeenForceRefreshed) || "false"
  ) ;

  if (!pageHasAlreadyBeenForceRefreshed) {
    window.localStorage.setItem(PageHasBeenForceRefreshed, "true");
    return window.location.reload();
  } else {
    window.localStorage.setItem(PageHasBeenForceRefreshed, "false");
  }
};

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, message: '' }
    }
    static getDerivedStateFromError(error) {
        return { hasError: true, message: error }
    }
    componentDidCatch(error, errorIinfo) {
        retryPageLoading();
        this.setState({ hasError: true });
        console.log(error, errorIinfo);
    }
    render() {
        if (this.state.hasError) {
            if (this.props.errorUI) {
                return this.props.errorUI;

            }
            else {
                return <h3>{this.state.message}</h3>
            }
        }
        else {
            return this.props.children;
        }
    }
}


export default ErrorBoundary;