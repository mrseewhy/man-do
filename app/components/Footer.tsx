async function getRenderedAt() {
  "use cache";
  return new Date().getFullYear();
}

const Footer = async () => {
  const year = await getRenderedAt();
  return (
    <div className="mx-auto text-center py-3 border-t border-gray-100 w-full  text-sm text-gray-600">
      &copy; {year} Man-Do. All rights reserved.
    </div>
  );
};

export default Footer;
