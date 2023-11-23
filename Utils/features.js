class features{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    filter(){
       let queryString = JSON.stringify(this.queryStr);
      queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        const queryObj = JSON.parse(queryString);
        this.query = this.query.find(queryObj);
        console.log(this.query);

        return  this;
    };

    sort(){
        if(this.queryStr.sort){
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }else{
            this.query = this.query.sort('-createdAt');
        }
        console.log(this.query);
        return  this;
    };

    limitFields(){
        if(this.queryStr.fields){
            const fields = this.queryStr.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select('-__v');
        }
        console.log(this.query);
        return  this;
    };

    paginate(){
        const page = this.queryStr.page*1 || 1;
        const limit = this.queryStr.limit*1 || 10;
        const skip = (page -1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        // if(this.queryStr.page){
        //     const moviesCount = await Movie.countDocuments();
        //     if(skip >= moviesCount){
        //         throw new Error("This page is not found!");
        //     }
        // }
        console.log(this.query);
        return  this;
    };
}

module.exports = features;