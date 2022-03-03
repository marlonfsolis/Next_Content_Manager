const LoaderSpinner = () => {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body has-text-centered">
        <div className="container">
          <div className="box is-shadowless">
            <button className="button is-inverted is-large is-loading" style={styles.loader}>Loading...</button>
          </div>
        </div>
      </div>
    </section>    
  );
}

const styles = {
  loader: {
    borderColor: "transparent",
    fontSize: "100px"
  }
}

export default LoaderSpinner;