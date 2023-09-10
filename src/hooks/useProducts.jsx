import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useProducts = () => {
    const {data: allProducts=[] , refetch} =useQuery({
        queryKey:["all-products"],
        queryFn: async()=> {
            const res = await axios.get("http://localhost:3000/all-products")
            return res.data;
        }
    })
    return [allProducts, refetch]

};

export default useProducts;