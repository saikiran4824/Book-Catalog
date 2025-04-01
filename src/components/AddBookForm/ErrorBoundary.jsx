import React from "react";

// Error Boundary Component to catch JavaScript errors in the component tree
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error occurred
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.log("Error:", error);
    console.log("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Display fallback UI if error occurs
      return <h2>Something went wrong!</h2>;
    }

    return this.props.children; // Render children if no error
  }
}

export default ErrorBoundary;
