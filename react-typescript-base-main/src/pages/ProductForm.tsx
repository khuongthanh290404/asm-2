import { useForm } from "react-hook-form";
import { Products } from "../interfaces/Products";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../ultis/validation";
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const ProductForm = () => {
  const { id } = useParams();
  const { state, onSubmit, getDetail } = useContext(ProductContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Products>({
    resolver: zodResolver(productSchema),
  });

  if (id) {
    useEffect(() => {
      (async () => {
        await getDetail(id);
        reset(state.selectedProduct);
      })();
    }, [id]);
  }
  return (
    <>
      <form onSubmit={handleSubmit((data) => onSubmit({ ...data, id }))}>
        <h1>{id ? "Form Update" : "Form Add"}</h1>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            {...register("title", {
              required: true,
            })}
            className="form-control"
          />
          {errors.title && (
            <div className="text-danger">{errors.title?.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            {...register("price", {
              required: true,
              valueAsNumber: true,
            })}
            className="form-control"
          />
          {errors.price && (
            <div className="text-danger">{errors.price?.message}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            {...register("description", {
              required: true,
            })}
            className="form-control"
          />
          {errors.description && (
            <div className="text-danger">{errors.description?.message}</div>
          )}
        </div>
        <button className="btn btn-info">{id ? "Update" : "Add"}</button>
      </form>
    </>
  );
};

export default ProductForm;
