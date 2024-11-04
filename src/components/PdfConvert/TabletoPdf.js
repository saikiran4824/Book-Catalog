// TableToPDF.js
import React from 'react';
import html2pdf from 'html2pdf.js';

const TableToPDF = () => {
  const generatePDF = () => {
    const element = document.getElementById('tableContent');
    const options = {
      margin:       1,
      filename:     'table-data.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <div className="container mt-4">
      <h2>My Data Table</h2>
      <div id="tableContent">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Age</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>28</td>
              <td>USA</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>34</td>
              <td>UK</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Sam Wilson</td>
              <td>22</td>
              <td>Canada</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary mt-3" onClick={generatePDF}>
        Download PDF
      </button>
    </div>
  );
};

export default TableToPDF;
