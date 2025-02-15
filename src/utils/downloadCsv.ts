import { saveAs } from 'file-saver';

export interface CsvData {
  name: string;
  detailsURL: string;
}

export const downoloadCsv = (data: CsvData[], fileName: string) => {
  if (data.length === 0) return;

  const title = ['Name', 'Details URl'];
  const refinedData = [title];

  data.forEach((pokemon) => {
    refinedData.push([pokemon.name, pokemon.detailsURL]);
  });

  let csvContent = '';
  refinedData.forEach((row) => {
    csvContent += row.join(',') + '\n';
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8,' });
  saveAs(blob, fileName);
};
