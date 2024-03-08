import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PieChart, pieArcClasses } from "@mui/x-charts/PieChart";
import { Box, useTheme } from "@mui/system";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Select from "@mui/material/Select";
import {
  Button,
  Divider,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import axios, { spread } from "axios";
import { useEffect, useRef, useState } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { validateSpent } from "../Validations/validateSpent";
import { Loading } from "../../Notification_and_Loading/Loading";
import {
  closeiconstyle,
  internalboxstyle,
  maingridstyle,
  monthyeartypographystyle,
  spentgridstyling,
  style,
  totalsalarytypographystyle,
} from "./SpentAnalysis.style";
import {
  spentrecordstype,
  spentformtype,
  SpentErrortype,
  reset,
  colors,
} from "./SpentAnalysis.utility";
import { Add } from "@mui/icons-material";
import CustomTextField from "../../CustomeTextfield";
import { globalColors, globalbuttonstyle } from "../../styles/Colors";
import { BASE_URL } from "../../constants";
import DownloadButton from "../../Notification_and_Loading/LoadingButton";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { image } from "html2canvas/dist/types/css/types/image";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
    fontSize: 25,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 22,
    fontWeight: "bold",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const SpentAnalysis = () => {
  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const [spentRecords, setSpentRecords] = useState<spentrecordstype | null>(
    null
  );
  const [thismonth, setThisMonth] = useState("");
  const [formObj, setformObj] = useState<spentformtype>(reset);
  const [error, setError] = useState<SpentErrortype>({});
  const [open, setOpen] = useState(false);
  const [salary, setSalary] = useState(0);
  const [savings, setSavings] = useState(0);
  const [callOnce, setCallOnce] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const pdfRef = useRef()

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setformObj(reset);
    setError({});
    setOpen(false);
  };

  const fetchTotalSalary = async () => {
    const jwt_token = localStorage.getItem("jwt_token");
    try {
      const response = await axios.get(`${BASE_URL}/fetchTotalSalary`, {
        headers: {
          Authorization: `${jwt_token}`,
        },
      });
      let responseData = response.data;
      console.log(responseData);
      // setSalary(responseData[0]["salary"]);
      setSalary(responseData)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSpentRecords = async () => {
    const jwt_token = localStorage.getItem("jwt_token");
    try {
      const response = await axios.get(
        `${BASE_URL}/fetchCurrentMonthRecord`,
        {
          headers: {
            Authorization: `${jwt_token}`,
          },
        }
      );
      let responseData = response.data;
      const currentDate = new Date();
      const currentMonth = currentDate.toLocaleString("default", {
        month: "long",
      });
      const currentYear = currentDate.getFullYear();
      const currentMonthKey = `${currentMonth} ${currentYear}`;
      setThisMonth(currentMonthKey);
      const currentMonthData = responseData[currentMonthKey];
      setSpentRecords(currentMonthData);
      setSavings(currentMonthData["Savings"]);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewSpent = async () => {
    try {
      let formData = { ...formObj, token: localStorage.getItem("jwt_token") };
      const update_spent = await axios.post(
        `${BASE_URL}/updateSpentRecord`,
        formData
      );
      console.log(update_spent);
      fetchSpentRecords();
    } catch (error) {
      console.log(error);
    }
  };

  const createData = (name: string, amount: number) => ({ name, amount });

  const rows = spentRecords
    ? [
        createData("PG", spentRecords["PG"]),
        createData("Food", spentRecords["Food"]),
        createData("Bills", spentRecords["Bills"]),
        createData("Traveling", spentRecords["Traveling"]),
        createData("Shopping", spentRecords["Shopping"]),
        createData("Other", spentRecords["Other"]),
        createData("Savings", spentRecords["Savings"]),
      ]
    : [];

  const transformedData = rows.map((item, index) => ({
    id: index,
    value: item.amount,
    label: item.name,
  }));

  const handleChange = (e: {
    target: { name: any; value: any };
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    let formData: spentformtype = {
      ...formObj,
      [e.target.name]: e.target.value,
    };
    setformObj(formData);
    const savings = transformedData[6]["value"];
    let errors: SpentErrortype = validateSpent(formData, savings);
    setError(errors);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let formData = formObj;
    const savings = transformedData[6]["value"];
    let errors = validateSpent(formData, savings);
    setError(errors);
    if (Object.keys(errors).length === 0) {
      addNewSpent();
      setformObj(reset);
      handleClose();
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const chartWidth = isMobile ? 400 : 800;
  const chartHeight = isMobile ? 300 : 600;

  useEffect(() => {
    // if (!open) {
    //   fetchSpentRecords();
    //   console.log(salary);
    // }
    if (callOnce) {
      fetchTotalSalary();
      fetchSpentRecords();
      setCallOnce(false);
    }
  }, [open]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Loading sizevalue={300} />
      </Box>
    );
  }
  const DownloadPDF = async () => {
    const input = pdfRef.current;
    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('l', 'mm', 'a4', true);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    // const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgX = 0;
    const imgY = 0;

    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`SpentAnalysisRecord${Date.now()}.pdf`);
  };

  return (
    <Box
      sx={{
        padding: "2rem",
        marginTop: "4rem",
      }}
      ref = {pdfRef}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          component="div"
          style={{ marginRight: "16px", fontWeight: "bold" }}
        >
          Spent Analysis
        </Typography>
        <Box>
          <IconButton onClick={handleOpen}>
            <Add sx={{ fontSize: "2.5rem" }} />
          </IconButton>
          <IconButton onClick={DownloadPDF}>
            <DownloadButton />
          </IconButton>
        </Box>
      </Box>
      {/* </Paper> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <HighlightOffIcon sx={closeiconstyle} onClick={handleClose} />
          <Typography variant="h6" component="h2">
            Add Spending
          </Typography>
          <Divider sx={{ my: 2 }} />
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Spent type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Spent type"
                name="spenttype"
                onChange={handleChange}
                required
              >
                <MenuItem value={"PG"}>PG</MenuItem>
                <MenuItem value={"Food"}>Food</MenuItem>
                <MenuItem value={"Bills"}>Bills</MenuItem>
                <MenuItem value={"Traveling"}>Traveling</MenuItem>
                <MenuItem value={"Shopping"}>Shopping</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
            <CustomTextField
              fullWidth={true}
              type={"search"}
              label={"Amount"}
              variant={"outlined"}
              name={"amount"}
              value={formObj["amount"]}
              placeholder={"Enter your Amount(in Rs)"}
              handleChange={handleChange}
              error={"amount" in error}
              helperText={error["amount"] || ""}
              margin={"normal"}
              required={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CurrencyRupeeIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" variant="contained" sx={globalbuttonstyle}>
              Add
            </Button>
          </form>
        </Box>
      </Modal>

      <Box
        sx={{
          display: "flex",
          marginTop: "3rem",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            flexGrow: 2,
            textAlign: "center",
            padding: "2rem 1rem",
            borderRadius: "3rem",
            height: { lg: "22vh", xs: "30" },
            margin: { lg: "0 2rem" },
            backgroundColor: "white",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {thismonth.split("-").join(", ")}
          </Typography>
          <Typography variant="body1" sx={{ color: globalColors.normaltext }}>
            (Overview)
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              padding: "2rem",
            }}
          >
            <Box sx={{ textAlign: "left", fontWeight: "bold" }}>
              <Typography variant="h6">Salary</Typography>
              <Typography variant="h6">Balance</Typography>
              <Typography variant="h6">Spent</Typography>
            </Box>
            <Box sx={{ textAlign: "right", color: globalColors.normaltext }}>
              <Typography variant="h6">
                ₹{formatter.format(salary).slice(1)}
              </Typography>
              <Typography variant="h6">
                ₹{formatter.format(savings).slice(1)}
              </Typography>
              <Typography variant="h6">
                ₹{formatter.format(salary - savings).slice(1)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 10,
            padding: "2rem 1rem",
            alignItems: "center",
            marginLeft: { lg: "5rem" },
          }}
        >
          <TableContainer
            sx={{
              boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
              padding: "2rem",
              borderRadius: "1.5rem",
              backgroundColor: "white",
            }}
          >
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>
                    <strong>SPENT TYPE</strong>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <strong>AMOUNT</strong>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .filter((row) => row.name !== "Savings")
                  .map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        sx={{ color: globalColors.normaltext }}
                      >
                        {`₹${formatter.format(row.amount).slice(1)}`}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
        <PieChart
          colors={colors}
          series={[
            {
              data: transformedData,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30 },
            },
          ]}
          width={chartWidth - 2 * 16}
          height={chartHeight - 2 * 16}
          sx={{
            [`& .${pieArcClasses.faded}`]: {
              fill: "gray",
            },
            margin: "2rem",
            padding: "1rem",
          }}
        />
      </Grid>
    </Box>
  );
};
