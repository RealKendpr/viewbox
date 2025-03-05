export default function CreatePage() {
  return (
    <form className="max-w-md" action="">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Create your links page</legend>
        <div>
          <label className="fieldset-label" htmlFor="page-title">
            Page Title
          </label>
          <input className="input w-full" type="text" id="page-title" />
        </div>
        <div>
          <label className="fieldset-label" htmlFor="icon-link">
            Icon External Link
          </label>
          <input className="input w-full" type="text" id="icon-link" />
        </div>
        <div>
          <p>Links</p>
          <div>
            <label className="fieldset-label" htmlFor="link-title">
              Link Title
            </label>
            <input className="input w-full" type="text" id="link-title" />
            <label className="fieldset-label" htmlFor="hyperlink">
              Hyperlink
            </label>
            <input className="input w-full" type="text" id="hyperlink" />
            <label className="fieldset-label" htmlFor="link-icon">
              Link's Icon
            </label>
            <input className="input w-full" type="text" id="link-icon" />
          </div>
        </div>
        <button className="btn">Create</button>
      </fieldset>
    </form>
  );
}
