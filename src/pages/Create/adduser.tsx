import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from '../pages.module.css';
import * as ExcelJS from 'exceljs';
import { useDispatch } from 'react-redux';
import { createUserAction } from '../../redux/userSlice';
import { ApiStatus, UserForm } from '../../redux/UserType';
import { useAppSelector } from '../../redux/hook';
import { RootState } from '../../redux/store';
import { MdVerifiedUser } from 'react-icons/md';

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
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [description, setDescription] = useState('');
    const [toastMessage, setToastMessage] = useState(false);

    const dispatch = useDispatch();
    const { createStatus } = useAppSelector((state: RootState) => state.user);

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

    function handleAddUser(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const formData: UserForm = {
            name,
            age,
            description,
        };
        if (name !== '' && age !== 0 && description !== '') {
            dispatch<any>(createUserAction(formData));
            setName('');
            setAge(0);
            setDescription('');
        } else if (age <= 0) {
            alert('Please enter age > 0');
        } else {
            alert('Please fill the form');
        }
    }

    useEffect(() => {
        if (createStatus === ApiStatus.success) {
            setToastMessage(true);
            setTimeout(() => {
                setToastMessage(false);
            }, 4000);
        }
    }, [createStatus]);

    return (
        <>
            <div className={styles.regisform}>
                <form action="">
                    <label htmlFor="name">Name :</label>
                    <input
                        value={name}
                        id="name"
                        className={styles.inputname}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="age"> Age :</label>
                    <input
                        value={age}
                        type="number"
                        id="age"
                        className={styles.inputage}
                        required
                        onChange={(e) => setAge(parseInt(e.target.value))}
                    />
                    <label htmlFor="desc"> Description :</label>
                    <input
                        id="desc"
                        value={description}
                        className={styles.inputdesc}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className={styles.btncreate} onClick={handleAddUser}>
                        Create
                    </button>
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
            {toastMessage && (
                <div className={styles.toastMessage}>
                    <MdVerifiedUser />
                    <h3>User Created</h3>
                </div>
            )}
        </>
    );
}

export default AddUser;
