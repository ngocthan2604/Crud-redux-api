import { ChangeEvent, useEffect, useState } from 'react';
import styles from '../pages.module.css';
import * as ExcelJS from 'exceljs';

interface ExcelData {
    ID: number;
    Name: string;
    Age: number;
    Email: string;
    Description: string;
    Job: string;
}

function AddUser() {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [data, setData] = useState<ExcelData[]>([]);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        const fileElement: File | undefined = e.target.files?.[0];
        setFile(fileElement);
    }

    function handleRender() {
        if (file) {
            const fileReader = new FileReader();

            fileReader.onload = function (e) {
                const arrayBuffer = e.target?.result;
                const workbook = new ExcelJS.Workbook();

                if (arrayBuffer) {
                    const buffer: ArrayBufferLike = arrayBuffer as ArrayBuffer;
                    workbook.xlsx.load(buffer).then(() => {
                        const worksheet = workbook.getWorksheet(1);

                        const dataArray: ExcelData[] = [];

                        worksheet.eachRow((row, rowNum) => {
                            if (rowNum > 1) {
                                const rowData: Record<string, any> = {};
                                row.eachCell((cell, colNum) => {
                                    const headerCell = worksheet.getCell(1, colNum);
                                    const headerText = headerCell.value?.toString();
                                    if (headerText) {
                                        const cellValue = cell.value;
                                        rowData[headerText] = cellValue;
                                    }
                                });
                                dataArray.push(rowData as ExcelData);
                            }
                        });

                        setData(dataArray);
                    });
                }
            };
            fileReader.readAsArrayBuffer(file);
        }
    }

    console.log(data);

    return (
        <>
            <div className={styles.regisform}>
                <form action="">
                    <label htmlFor="name">Name :</label>
                    <input id="name" className={styles.inputname} required />
                    <label htmlFor="age"> Age :</label>
                    <input id="age" className={styles.inputage} required />
                    <label htmlFor="desc"> Description :</label>
                    <input id="desc" className={styles.inputdesc} required />
                    <button className={styles.btncreate}>Create</button>
                </form>
            </div>
            <div className={styles.datafromfile}>
                <input type="file" onChange={handleChange} />
                <button className={styles.btnsubmitdata} onClick={handleRender}>
                    Add Data
                </button>
                <div className={styles.result}>
                    <table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Job</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.ID}</td>
                                    <td>{item.Name}</td>
                                    <td>{item.Email}</td>
                                    <td>{item.Job}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AddUser;
