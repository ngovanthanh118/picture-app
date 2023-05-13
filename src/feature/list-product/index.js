import {
    Breadcrumbs,
    Grid,
    Typography,
    Button,
} from "@mui/material";
import BoxBody from "../../components/box-body";
import { LIST_PRODUCT_DATA } from "../../data/list-product";
import { useParams, Link } from "react-router-dom";
import { convertWithCommas } from "../../ultis/number";
import { ROUTE } from "../../router/config";
import { useNavigate } from "react-router";
import { scrollToTop } from "../../ultis/scroll";
import { useEffect } from "react";
export default function ListProduct() {
    const navigate = useNavigate();
    const { id } = useParams();
    const listProuct = LIST_PRODUCT_DATA.find((item) => item.idCate == id);
    const list = listProuct.items.map((item) => {
        return {
            idLits: listProuct.idList,
            idProc: item.idProc,
            nameCate: item.nameCate,
            image: item.imageUrl,
            name: item.nameProc,
            price: item.price,
        }
    });
    useEffect(() => {
        scrollToTop();
      }, [id]);
    const breadcrumbs = [
        <Link to="/" style={{ textDecoration: "none" }}>
            <Typography>Trang chủ</Typography>
        </Link>,
        <Typography key="3" color="text.primary">
            {list[0].nameCate}
        </Typography>,
    ];
    return (
        <BoxBody>
            <Breadcrumbs separator="/" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>
            <Grid container spacing={2} mt={3} sx={{ margin: "16px" }} >
                {list.map((item) => (
                    <Grid item xs={4} xl={6} key={`${item.idProc}-${item.idLits}`} >
                        <img src={item.image} alt={item.name} width="80%" height="300px"
                            onClick={() => navigate(ROUTE.DETAIL.replace(":id", `${item.idProc}-${item.idLits}`))}
                            style={{
                                cursor: "pointer",
                                border: "1px solid #555",
                                borderRadius: "6px",
                                boxShadow: "16px 6px #ccc"
                            }
                            } />
                        <Typography sx={{ fontSize: "1rem", fontWeight: "bolder", marginTop: "6px" }}> {item.name}</Typography>
                        <Typography sx={{ fontSize: "1rem", fontColor: "#ff0000" }}>{convertWithCommas(item.price)}</Typography>
                        <Button variant="contained" sx={{
                            border: "1px solid #333",
                            textAlign: "center",
                            margin: "6px 0",
                        }}>
                            Mua ngay
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </BoxBody>
    )
}