from flask_restful import Resource, reqparse, marshal_with
from linkpreview import link_preview, LinkPreview
from urllib.parse import urlparse
from flask_restful import fields

link_post_args = reqparse.RequestParser()
link_post_args.add_argument("url", type=str, help="URL za parsiranje", required=True)

def uri_validator(x: str):
    try:
        result = urlparse(x)
        return all([result.scheme, result.netloc])
    except:
        return False

class Result:
    name: str = None
    img_url: str = None
    desc: str = None
    link: str = None
    def __init__(self, preview: LinkPreview):
        self.name = preview.force_title
        self.desc = preview.description 
        self.img_url = preview.absolute_image

result_marshaller = {
    "name": fields.String,
    "desc": fields.String,
    "imgUrl": fields.String(attribute="img_url"),
    "link": fields.String
}

# /api/v1/parseUrl
class LinkPreviewer(Resource):
    
    @marshal_with(result_marshaller, envelope="data")
    def post(self):
        from babinje import api_error

        args = link_post_args.parse_args()
        url = args["url"]

        result = uri_validator(url)
        
        if result:
            preview = link_preview(url, parser="lxml")
            result = Result(preview=preview)
            result.link = url
            return result, 200
        else:
            api_error(400, -1918, "This is an invalid url")